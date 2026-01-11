from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your routers from routes folder
from .routes import endpoints, ws

# Create the FastAPI app
api = FastAPI(title="Filler Game API")

# CRITICAL: Configure CORS to allow WebSocket connections
api.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default
        "http://localhost:3000",  # React default
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
api.include_router(endpoints.router, prefix="/api", tags=["AI"])
api.include_router(ws.router, tags=["WebSocket"])

@api.get("/")
def root():
    return {"message": "Filler Game API", "status": "running"}

@api.get("/health")
def health():
    return {"status": "healthy"}