from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
from typing import Optional, Dict, Any
import qrcode
from io import BytesIO
import base64

app = FastAPI()

# add middleware to allow CORS
app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://*.up.railway.app",
    'https://qrme.up.railway.app',
    "https://qrme-badge-app.vercel.app",
    "https://*.vercel.app"
    ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class QRTarget(str,Enum):
    linkedin = "linkedin"
    github = "github"
    personal = "personal"
class AttendeeData(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    linkedin: str
    github: str
    qr_target: QRTarget = QRTarget.linkedin
    qr_target: QRTarget = QRTarget.linkedin

@app.get("/")
def read_root():
    return {"message": "QR badge API is running!"}

@app.post("/generate-qr")

def generate_qr(attendee: AttendeeData) -> Dict[str, Any]:
    if attendee.qr_target == QRTarget.linkedin:
        qr_url = f"https://www.linkedin.com/in/{attendee.linkedin}"
    elif attendee.qr_target == QRTarget.github:
        qr_url = f"https://github.com/{attendee.github}"
    elif attendee.qr_target == QRTarget.personal:
      # Build phone line if phone is provided
      phone_line = (
        f"Tel:{attendee.phone}\n"
        if attendee.phone else ""
      )
      
      qr_url = f"""BEGIN:VCARD
VERSION:3.0
FN:{attendee.name}
EMAIL:{attendee.email}
{phone_line}
URL;type=LinkedIn:https://linkedin.com/in/{attendee.linkedin}
URL;type=GitHub:https://github.com/{attendee.github}
END:VCARD
"""
    else:
      qr_url = "Invalid QR target"

    # Generate QR code
    qr = qrcode.QRCode(
      version=1,
      box_size=10,
      border=4
    )

    # qr.add_data(qr_text)
    qr.add_data(qr_url)
    qr.make(fit=True)
    
    # Create an image from the QR Code instance
    img = qr.make_image(
      fill_color='black',
      back_color='white'
      )
    
    #convert image to base64
    buffer = BytesIO()
    img.save(buffer)
    img_str = base64.b64encode(
      buffer.getvalue()
      ).decode()
    
    return {
      'attendee': {
        'name': attendee.name,
        'email': attendee.email,
        'phone': attendee.phone,
        'linkedin': attendee.linkedin,
        'github': attendee.github,
        'qr_target': attendee.qr_target
      },
      'qr_code': (f"data:image/png;base64,{img_str}"),
      'qr_url': qr_url
    }