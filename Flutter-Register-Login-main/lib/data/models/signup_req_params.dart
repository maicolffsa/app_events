// ignore_for_file: public_member_api_docs, sort_constructors_first

class SignupReqParams {
  final String username;
  final String password;

  SignupReqParams({required this.username, required this.password});

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'username': username,
      'password': password,
    };
  }
}
