import cv2
import face_recognition
import numpy as np
import time
import Online
# Load the known face encodings from the .npz file
known_faces_data = np.load("known_images.npz")
known_face_encodings = known_faces_data["encodings"]
known_face_names = known_faces_data["names"]

# Initialize the camera
cap = cv2.VideoCapture(0)

# Set the time threshold for calling the function in seconds
time_threshold = 7
last_time_called = time.time()

while True:
    # Capture a frame from the camera
    ret, frame = cap.read()

    # Resize the frame to a smaller size for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    # Convert the frame to RGB
    rgb_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    # Detect faces in the frame
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations, num_jitters=1, model='cnn')

    # Loop through the detected faces
    for face_location, face_encoding in zip(face_locations, face_encodings):
        # Compare the detected face with the known faces
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"

        # Find the best match
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]
            # Check if enough time has passed since the last function call
            if time.time() - last_time_called >= time_threshold:
                # Call the function for recognition
                Online.get_document_id_from_firebase(name)
                last_time_called = time.time()

        # Scale the face location coordinates back to the original frame size
        top, right, bottom, left = face_location
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a rectangle around the detected face and display the name
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

    # Display the frame
    cv2.imshow("Face Recognition", frame)

    # Exit the loop when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
