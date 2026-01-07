from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from backend.app.routes.endpoints import router



api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api.include_router(router, prefix="/api")


@api.get("/")
def root():
    return {"message": "Hello from AI!"}
