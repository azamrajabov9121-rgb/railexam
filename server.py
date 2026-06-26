#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RailExam Local Server
- Statik fayllarni serve qiladi (html, css, js)
- POST /api/questions  => questions.js faylini yangilaydi
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json, os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
QUESTIONS_FILE = os.path.join(BASE_DIR, 'questions.js')
RESULTS_FILE = os.path.join(BASE_DIR, 'results.js')


class RailExamHandler(SimpleHTTPRequestHandler):

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/questions':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                questions = json.loads(body)

                # questions.js faylini yangilaymiz
                with open(QUESTIONS_FILE, 'w', encoding='utf-8') as f:
                    f.write('// ============================================================\n')
                    f.write('// RailExam - Savol bazasi (Question Database)\n')
                    f.write('// Bu fayl admin panel orqali boshqariladi.\n')
                    f.write("// Qo'lda o'zgartirmang!\n")
                    f.write('// ============================================================\n')
                    f.write('window.DB_QUESTIONS = ')
                    f.write(json.dumps(questions, ensure_ascii=False, indent=2))
                    f.write(';\n')

                self.send_response(200)
                self._cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                resp = json.dumps({'ok': True, 'count': len(questions)})
                self.wfile.write(resp.encode('utf-8'))
                print(f'  [OK] questions.js yangilandi: {len(questions)} ta savol')

            except Exception as e:
                self.send_response(500)
                self._cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': str(e)}).encode())
                print(f'  [XATO] {e}')
        elif self.path == '/api/results':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                results = json.loads(body)

                with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
                    f.write('// ============================================================\n')
                    f.write('// RailExam - Natijalar bazasi (Results Database)\n')
                    f.write('// Bu fayl tizim tomonidan avtomatik yangilanadi.\n')
                    f.write('// ============================================================\n')
                    f.write('window.DB_RESULTS = ')
                    f.write(json.dumps(results, ensure_ascii=False, indent=2))
                    f.write(';\n')

                self.send_response(200)
                self._cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                resp = json.dumps({'ok': True, 'count': len(results)})
                self.wfile.write(resp.encode('utf-8'))
                print(f'  [OK] results.js yangilandi: {len(results)} ta natija')

            except Exception as e:
                self.send_response(500)
                self._cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': str(e)}).encode())
                print(f'  [XATO] {e}')
        else:
            self.send_response(404)
            self.end_headers()

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def log_message(self, format, *args):
        if len(args) >= 2 and args[1] not in ('200', '304', '304'):
            super().log_message(format, *args)


if __name__ == '__main__':
    os.chdir(BASE_DIR)
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = HTTPServer(('', port), RailExamHandler)
    print(f'')
    print(f'  >> RailExam Server ishga tushdi')
    print(f'  >> http://localhost:{port}')
    print(f'  >> Papka: {BASE_DIR}')
    print(f'  >> Savollar: questions.js')
    print(f'  >> Natijalar: results.js')
    print(f'')
    print(f"  To'xtatish uchun: Ctrl+C")
    print(f'')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server to'xtatildi.")
