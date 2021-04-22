import { http } from './http';
import './websocket/client';

http.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}!`);
});