import face_recognition
import os
import numpy as np

# Load the known faces from the database folder
known_faces_folder = "images"
known_face_encodings = []
known_face_names = []

for file_name in os.listdir(known_faces_folder):
    image = face_recognition.load_image_file(os.path.join(known_faces_folder, file_name))
    face_encodings = face_recognition.face_encodings(image)
    if len(face_encodings) > 0:
        # Take the first face encoding if multiple faces are detected
        face_encoding = face_encodings[0]
        known_face_encodings.append(face_encoding)
        known_face_names.append(file_name.split(".")[0])
    else:
        print(f"No face detected in {file_name}")

# Save the known face encodings to a .npz file
np.savez("known_images.npz", encodings=known_face_encodings, names=known_face_names)