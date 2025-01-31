// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:auth/domain/entities/user.dart';

class UserModel {
  final String username;

  UserModel({required this.username});

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      username: map['username'] as String,
    );
  }
}

extension UserXModel on UserModel {
  UserEntity toEntity() {
    return UserEntity(username: username);
  }
}
