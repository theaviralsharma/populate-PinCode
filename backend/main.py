from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from database import SessionLocal, engine
import models
import crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.postalpincode.in/pincode/"

def fetch_location_data(pincode: str):
    response = requests.get(f"{BASE_URL}{pincode}")
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching data from postal API")
    
    data = response.json()
    
    if not data or data[0]['Status'] != 'Success':
        raise HTTPException(status_code=404, detail="Invalid Pincode or no data found")
    
    post_offices = data[0]['PostOffice']
    if not post_offices:
        raise HTTPException(status_code=404, detail="No post office data available")
    
    primary_location = {
        "pincode": pincode,
        "city": post_offices[0]['District'],
        "state": post_offices[0]['State'],
        "country": post_offices[0]['Country']
    }
    
    return primary_location

@app.get("/location/{pincode}")
def get_location(pincode: str):
    db = SessionLocal()
    # Check if the data is already stored
    existing_data = crud.get_location(db, pincode)
    if existing_data:
        return existing_data

    # Fetch new data and store it
    location_data = fetch_location_data(pincode)
    crud.create_location(db, location_data)
    
    return location_data