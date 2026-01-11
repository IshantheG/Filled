from typing import Dict
from .room import GameRoom as Room

class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Room] = {}

    def get_room(self, room_id: str) -> Room:
        if room_id not in self.rooms:
            self.rooms[room_id] = Room(room_id)
        return self.rooms[room_id]

room_manager = RoomManager()

