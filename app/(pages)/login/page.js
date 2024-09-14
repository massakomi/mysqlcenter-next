export function Page() {
  return (
    <div className="page-login">
      <div className="message">
        {this.props.message}
      </div>
      <form method="post" onSubmit={this.doLogin}>
        <b>логин</b>
        <p><input type="text" name="user" defaultValue="root" /></p>
        <b>пароль</b>
        <p><input type="password" name="pass" defaultValue="root" /></p>
        <p style={{marginTop: '10px'}}><input type="submit" value="Enter" /></p>
      </form>
    </div>
  );
}