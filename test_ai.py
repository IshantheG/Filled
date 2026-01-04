import requests
import json

# Test board: 7x8 grid
# Bottom-left (player 1 start): 0
# Top-right (player 2 start): 3
# All others: 1
board = [
    [1, 1, 1, 1, 1, 1, 1, 3],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
]

# Send request to API
response = requests.post(
    "http://127.0.0.1:8000/api/ai-move",
    json={"board": board}
)

print("Status Code:", response.status_code)
print("Response:", response.json())
