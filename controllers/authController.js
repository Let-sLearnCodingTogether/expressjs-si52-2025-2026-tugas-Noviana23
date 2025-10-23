import UserModel from "../models/userModel.js";
import { compare, hash } from "../utils/hashUtil.js";
import { jwtSignUtil } from "../utils/jwtSignUtil.js";

export const register = async (req, res) => {
  try {
    const registerData = req.body;

    const existingUser = await UserModel.findOne({ email: registerData.email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
        data: null,
      });
    }

    const hashPassword = await hash(registerData.password);

    await UserModel.create({
      username: registerData.username,
      email: registerData.email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "Berhasil register, silahkan login",
      data: null,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const loginData = req.body;

    const user = await UserModel.findOne({ email: loginData.email });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        data: null,
      });
    }

    const isMatch = await compare(loginData.password, user.password);

    if (isMatch) {
      const token = jwtSignUtil(user);

      return res.status(200).json({
        message: "Login Berhasil",
        data: {
          username: user.username,
          email: user.email,
          token: token,
        },
      });
    }

    return res.status(401).json({
      message: "Login Gagal, password salah",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
