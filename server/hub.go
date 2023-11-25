// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"encoding/json"
	"fmt"
)

type Preferences struct {
	Budget     string   `json:"budget"`
	Categories []string `json:"categories"`
	Time       string   `json:"time"`
	Transport  string   `json:"transport"`
}

type Group struct {
	Name        string      `json:"name"`
	Members     []string    `json:"members"`
	Preferences Preferences `json:"preferences"`
	Id          string      `json:"id"`
	State       string      `json:"state"`
}

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client

	Groups []Group `json:"groups"`
}

func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		Groups:     []Group{},
	}
}

func (h *Hub) toBytes() []byte {
	bytes, _ := json.Marshal(h.Groups)
	fmt.Println("broadcast")
	return bytes
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			// h.broadcast <- h.toBytes()
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:

				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}
