// src/utils/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Replace with your backend URL

export const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Use WebSocket only
  reconnectionAttempts: 5, // Retry 5 times on disconnect
});
