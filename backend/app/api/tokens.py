from flask import jsonify, g, session

from app import db
from app.api import bp
from app.api.auth import basic_auth, token_auth


#? Not GET ?
@bp.route('/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    #print(1111)
    token = g.current_user.get_token()
    #print(2222, token)
    db.session.commit()
    #print('current user: ', g.current_user)
    #for u in session.active_users:
    #    print(u)
    #print(3333)
    #payload = jwt.encode(
    #    {'token': token, 'user_id': g.current_user.id,
    #     'expire': g.current_user.token_expiration},
    #    current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
    #return jsonify({'token': token, 'user': g.current_user.to_dict()})
    payload = {'token': token, 'user_id': g.current_user.id,
               'expire': g.current_user.token_expiration}
    return jsonify(payload)


@bp.route('/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    g.current_user.revoke_token()
    db.session.commit()
    return '', 204
