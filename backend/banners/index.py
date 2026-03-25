"""
API для управления реферальными баннерами МФО.
Поддерживает получение списка, создание, обновление и удаление баннеров.
"""
import json
import os
import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def check_admin(event):
    token = event.get('headers', {}).get('X-Admin-Token', '')
    return token == os.environ.get('ADMIN_PASSWORD', '')


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    body = json.loads(event.get('body') or '{}')

    conn = get_conn()
    cur = conn.cursor()

    # GET /banners — публичный список активных баннеров
    if method == 'GET' and '/admin' not in path:
        cur.execute(
            "SELECT id, title, description, logo_url, ref_url, rate, amount, term FROM banners WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC"
        )
        rows = cur.fetchall()
        cols = ['id', 'title', 'description', 'logo_url', 'ref_url', 'rate', 'amount', 'term']
        banners = [dict(zip(cols, row)) for row in rows]
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'banners': banners})}

    # Все /admin маршруты требуют авторизации
    if not check_admin(event):
        conn.close()
        return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unauthorized'})}

    # GET /admin — все баннеры для админки
    if method == 'GET' and '/admin' in path:
        cur.execute(
            "SELECT id, title, description, logo_url, ref_url, rate, amount, term, is_active, sort_order FROM banners ORDER BY sort_order ASC, id ASC"
        )
        rows = cur.fetchall()
        cols = ['id', 'title', 'description', 'logo_url', 'ref_url', 'rate', 'amount', 'term', 'is_active', 'sort_order']
        banners = [dict(zip(cols, row)) for row in rows]
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'banners': banners})}

    # POST /admin — создать баннер
    if method == 'POST':
        cur.execute(
            "INSERT INTO banners (title, description, logo_url, ref_url, rate, amount, term, is_active, sort_order) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
            (body.get('title', ''), body.get('description', ''), body.get('logo_url', ''),
             body.get('ref_url', ''), body.get('rate', ''), body.get('amount', ''),
             body.get('term', ''), body.get('is_active', True), body.get('sort_order', 0))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 201, 'headers': CORS_HEADERS, 'body': json.dumps({'id': new_id})}

    # PUT /admin — обновить баннер
    if method == 'PUT':
        bid = body.get('id')
        cur.execute(
            "UPDATE banners SET title=%s, description=%s, logo_url=%s, ref_url=%s, rate=%s, amount=%s, term=%s, is_active=%s, sort_order=%s WHERE id=%s",
            (body.get('title', ''), body.get('description', ''), body.get('logo_url', ''),
             body.get('ref_url', ''), body.get('rate', ''), body.get('amount', ''),
             body.get('term', ''), body.get('is_active', True), body.get('sort_order', 0), bid)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    # DELETE /admin — удалить баннер
    if method == 'DELETE':
        bid = body.get('id')
        cur.execute("DELETE FROM banners WHERE id=%s", (bid,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    conn.close()
    return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}
