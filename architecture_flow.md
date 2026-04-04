# System Architecture & Event Flow

This diagram illustrates the high-level interaction between the Frontend, Backend, Database, Redis, and Real-time Sockets.

```mermaid
graph TD
    subgraph Client [Frontend - React/Vite]
        UI[User Interface]
        SC[Socket.io Client]
        Store[State Management - Redux/Zustand]
    end

    subgraph API_Gateway [Backend - Node/Express]
        Auth[Auth Middleware - JWT]
        Ctrl[Controllers - Business Logic]
        SocketSrv[Socket.io Server]
    end

    subgraph Data [Storage & Caching]
        DB[(MongoDB - Persistent Data)]
        R[(Redis - Caching & Real-time Tracking)]
        Cloud[Cloudinary - Product Images]
    end

    UI -->|HTTP Requests| Auth
    Auth --> Ctrl
    Ctrl -->|Query/Write| DB
    Ctrl -->|Cache/Fetch| R
    Ctrl -->|Upload| Cloud

    %% Real-time Flow
    SocketSrv <-->|Live Events| SC
    SocketSrv -->|Temporary State| R

    %% Specific Flows
    SC -.->|Chat Message| SocketSrv
    SocketSrv -.->|Delivery Update| R
    R -.->|Track Location| SC

    %% Recommendations
    R -->|Preference Matching| Ctrl
    Ctrl -->|Personalized Feed| UI
```

## Detailed Data Flow

1. **User Login**: Frontend → JWT → Backend → DB check. Token stored in HTTP-only cookie.
2. **Product Recommendation**:
   - User clicks product → Backend increments "Click Score" in **Redis**.
   - Redis calculates "Popular in [Category]" using Sorted Sets.
   - Frontend fetches results from Redis (Latency < 5ms).
3. **Chat Integration**:
   - Sender → Socket.io (Server) → Save to MongoDB (Async) → Emit to Receiver.
4. **Product Tracking**:
   - Carrier Agent shares Location → Socket.io → Update coordinate in **Redis Geospatial Index**.
   - User fetches "Where is my product?" → Backend queries Redis for latest coordinate → UI displays on Map.
