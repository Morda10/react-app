const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Yup = require("yup");

const User = require("../../models/User");

const validationSchema = Yup.object().shape({
  name: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Email not valid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("error");
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  const [email] = req.body.email;
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const nuser = new User({
      name: req.body.name,
      //lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    await nuser.save();
    console.log(nuser);
    return res.status(200).json(nuser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json("error");
    }
    return res.status(200).json("ss");
  } catch (error) {
    console.log(error);
  }
});

// @route    POST api/users
// @desc     Register user
// @access   Public

// router.post(
//     '/',
//     [
//       check('name', 'Name is required')
//         .not()
//         .isEmpty(),
//       check('email', 'Please include a valid email').isEmail(),
//       check(
//         'password',
//         'Please enter a password with 6 or more characters'
//       ).isLength({ min: 6 })
//     ],
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const { name, email, password } = req.body;

//       try {
//         let user = await User.findOne({ email });

//         if (user) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'User already exists' }] });
//         }

// const avatar = gravatar.url(email, {
//   s: '200',
//   r: 'pg',
//   d: 'mm'
// });

//       user = new User({
//         name,
//         email,
//         avatar,
//         password
//       });

//       const salt = await bcrypt.genSalt(10);

//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const payload = {
//         user: {
//           id: user.id
//         }
//       };

//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

module.exports = router;
