from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.song_service import generate_song_payload

app = FastAPI(title='GrungeForge API', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class GenerateSongRequest(BaseModel):
    prompt: str
    mode: str = 'quick'


@app.get('/health')
def health() -> dict:
    return {'status': 'ok', 'service': 'grungeforge-api'}


@app.post('/api/v1/prompts/parse')
def parse_prompt(payload: dict) -> dict:
    prompt = payload.get('prompt', '')
    return {
        'prompt': prompt,
        'song_spec': {
            'tempo': 118,
            'key': 'D minor',
            'tuning': 'Drop D',
            'duration_seconds': 150,
            'mood': ['bleak', 'angry', 'live-room'],
            'sections': ['verse', 'chorus', 'verse', 'chorus', 'bridge', 'final chorus'],
            'style': 'grunge',
        },
    }


@app.post('/api/v1/songs/generate')
def generate_song(payload: GenerateSongRequest) -> dict:
    song = generate_song_payload(payload.prompt, payload.mode)
    return {
        'status': 'queued',
        'song': song,
    }


@app.get('/api/v1/songs/{song_id}')
def get_song(song_id: str) -> dict:
    return {
        'id': song_id,
        'status': 'ready',
        'title': 'Untitled grunge track',
        'download_urls': {
            'mp3': '/downloads/preview.mp3',
            'wav': '/downloads/preview.wav',
            'tabs': '/downloads/tabs.pdf',
            'drums': '/downloads/drums.pdf',
        },
    }
