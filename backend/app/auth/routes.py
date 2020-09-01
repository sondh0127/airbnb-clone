from flask import render_template, redirect, url_for, flash, request

@bp.route('/login', methods=['GET', 'POST'])
def login():


@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main.index'))


@bp.route('/register', methods=['GET', 'POST'])
def register():


#? @bp.route('/reset_password_request', methods=['GET', 'POST'])
#? def reset_password_request():
#? @bp.route('/reset_password/<token>', methods=['GET', 'POST'])
#? def reset_password(token):