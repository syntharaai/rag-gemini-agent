"""
Simple HTTP server for the documentation website.
"""
import http.server
import socketserver
import os

PORT = 8082

class DocServer(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler for documentation."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), DocServer) as httpd:
        print(f"Serving documentation at http://localhost:{PORT}")
        httpd.serve_forever()
