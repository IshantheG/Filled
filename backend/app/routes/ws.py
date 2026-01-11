from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ..onlinegame.manager import room_manager
import json
import logging

# Set up logging to help debug
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    logger.info(f"WebSocket connection attempt for room: {room_id}")
    
    try:
        await websocket.accept()
        logger.info(f"WebSocket accepted for room: {room_id}")
        
        room = room_manager.get_room(room_id)
        player_id = room.add_player(websocket)
        logger.info(f"Player {player_id} added to room {room_id}")

        # Send initial state to the player
        await websocket.send_text(json.dumps({
            "type": "init",
            "playerId": player_id,
            "state": room.state()
        }))
        logger.info(f"Initial state sent to player {player_id}")

        # Keep connection alive and handle messages
        while True:
            try:
                text = await websocket.receive_text()
                data = json.loads(text)
                logger.info(f"Received message from player {player_id}: {data}")

                if data["type"] == "move":
                    if room.turn != player_id:
                        logger.info(f"Not player {player_id}'s turn, ignoring move")
                        continue

                    room.apply_move(data["move"])
                    logger.info(f"Move applied by player {player_id}")

                    # Broadcast updated state to all players
                    for ws in room.players:
                        try:
                            await ws.send_text(json.dumps({
                                "type": "update",
                                "state": room.state()
                            }))
                        except Exception as e:
                            logger.error(f"Error sending to player: {e}")

                elif data["type"] == "reset":
                    logger.info(f"Game reset by player {player_id}")
                    room.reset()
                    # Broadcast reset state to all players
                    for ws in room.players:
                        try:
                            await ws.send_text(json.dumps({
                                "type": "update",
                                "state": room.state()
                            }))
                        except Exception as e:
                            logger.error(f"Error sending reset to player: {e}")

            except json.JSONDecodeError as e:
                logger.error(f"JSON decode error: {e}")
            except Exception as e:
                logger.error(f"Error processing message: {e}")
                break

    except WebSocketDisconnect:
        logger.info(f"Player disconnected from room {room_id}")
        room.remove_player(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        try:
            room.remove_player(websocket)
        except:
            pass