### Containers Setup:


#### Setup Instructions:
- **Navigate to the Project Root Directory:**
  - Open a terminal or command prompt and go to the directory where the code is located.
    ```
    docker build -t my-backend-app:latest ./backend
    docker build -t my-frontend-app:latest ./frontend
    ```
-  **Compose Up**:
    - Run docker-compose up in the project root directory.
        ```
        docker-compose up
        ```

### To Access the application
- **Frontend: http://localhost:80**
- **Backend: http://localhost:3001**