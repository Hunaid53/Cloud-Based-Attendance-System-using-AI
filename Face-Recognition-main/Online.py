import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Set up the Firebase Realtime Database URL
database_url = 'https://attendence-3de9b-default-rtdb.asia-southeast1.firebasedatabase.app'

# Construct the URL for the Firebase Realtime Database endpoint
endpoint = f'{database_url}/Student.json'

# Get the current date
current_date = datetime.datetime.now().strftime('%a %b %d %Y')

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('attendence-3de9b-firebase-adminsdk-gmexe-90d897bffe.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': database_url
})


def get_document_id_from_firebase(name):
    # Create a reference to the Firebase Realtime Database
    ref = db.reference('/Student')

    # Retrieve data from the Firebase Realtime Database
    data = ref.get()

    if data:
        # Search using the field
        field = 'name'
        # Search for the document ID of the user with the given name in the database
        document_id = None
        for document_id, document_data in data.items():
            if field in document_data and document_data[field] == name:
                break

        if document_id:
            print(f"The user {name} is Found!")
            create_attendance_entry(document_id, name)
        else:
            print(f"No user found with name {name} in Firebase Realtime Database")
    else:
        print("Failed to retrieve data from Firebase Realtime Database.")


def create_attendance_entry(document_id, name):
    # Create a reference to the Firebase Realtime Database
    ref = db.reference(f'/Attendance/{current_date}/{document_id}')

    # Check if attendance already exists for the current date
    attendance_data = ref.get()

    if attendance_data:
        print(f"Attendance entry for {current_date} already exists for user {name}")
    else:
        # Define the data to be stored in the attendance entry
        attendance_data = {
            'comment': '',
            'status': 'P'
        }

        # Write the attendance entry to the database
        ref.set(attendance_data)

        print(f"Attendance entry for {current_date} created for user {name}")
