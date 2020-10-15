<template>
  <div class="container-fluid">
    <div class="mt-5 col-3">
        <form
          id="registerForm "
          name="registerForm"
          @submit.prevent="submitRegister($event)"
        >
          <h2>Register</h2>
          <div class="form-group">
            <input
              id="userName"
              v-model.trim="$v.userName.$model"
              :class="{
                'is-invalid': $v.userName.$error,
                'is-valid': !$v.userName.$invalid,
              }"
              type="text"
              placeholder="Username"
              class="form-control"
            />
            <div class="valid-feedback">Username is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.userName.required"> Username is required! </span>
              <span v-if="!$v.userName.minLength">
                Username must have at least 3 characters!</span
              >
              <span v-if="!$v.userName.maxLength">
                Username must have at most 10 characters!</span
              >
            </div>
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              id="password"
              v-model.trim="$v.password.$model"
              :class="{
                'is-invalid': $v.password.$error,
                'is-valid': !$v.password.$invalid,
              }"
            />
            <div class="valid-feedback">Password is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.password.required"> Password is required! </span>
              <span v-if="!$v.password.minLength">
                Password must have at least 3 characters!</span
              >
            </div>
          </div>
          <div class="form-group">
            <input
              id="email"
              v-model.trim="$v.email.$model"
              :class="{
                'is-invalid': $v.email.$error,
                'is-valid': !$v.email.$invalid,
              }"
              type="email"
              placeholder="Email"
              class="form-control"
            />
            <div class="valid-feedback">Email is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.email.required"> Email is required! </span>
              <span v-if="!$v.email.email">
                Email must be in correct format! (ex@ex.ex)
              </span>
            </div>
          </div>
          <div class="form-group">
            <input
              id="firstName"
              v-model.trim="$v.firstName.$model"
              :class="{
                'is-invalid': $v.firstName.$error,
                'is-valid': !$v.firstName.$invalid,
              }"
              type="text"
              placeholder="First name"
              class="form-control"
            />
            <div class="valid-feedback">First name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.firstName.required">
                First name is required!
              </span>
            </div>
          </div>
          <div class="form-group">
            <input
              id="lastName"
              v-model.trim="$v.lastName.$model"
              :class="{
                'is-invalid': $v.lastName.$error,
                'is-valid': !$v.lastName.$invalid,
              }"
              type="text"
              placeholder="Last name"
              class="form-control"
            />
            <div class="valid-feedback">Last name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.lastName.required"> Last name is required! </span>
            </div>
          </div>
          <div class="form-group">
            <input
              id="phone"
              v-model.trim="$v.phone.$model"
              :class="{
                'is-invalid': $v.phone.$error,
                'is-valid': !$v.phone.$invalid,
              }"
              type="tel"
              placeholder="Phone"
              class="form-control"
            />
            <div class="valid-feedback">Phone is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.phone.required"> Phone is required! </span>
              <span v-if="!$v.phone.numeric">
                Phone must contain only numeric digits!
              </span>
            </div>
          </div>
          <div class="form-group">
            <input
              id="address"
              v-model.trim="$v.address.$model"
              :class="{
                'is-invalid': $v.address.$error,
                'is-valid': !$v.address.$invalid,
              }"
              type="text"
              placeholder="Address"
              class="form-control"
            />
            <div class="valid-feedback">Address is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.address.required"> Address is required! </span>
            </div>
          </div>
          <button class="btn btn-primary mr-3" :disabled="$v.$invalid" type="submit">
            Submit registration
          </button>
          <button class="btn btn-secondary" type="button" @click="$router.push('/login')">
          Go to Login page</button>

        </form>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    };
  },
  validations: {
    userName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
    password: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    address: {
      required,
    },
    phone: {
      numeric,
      required,
    },
  },
  methods: {
    submitRegister(event) {
      axios
        .post('http://localhost:9000/api/users/register', {
          id: 0,
          userName: this.userName,
          pw: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          phone: this.phone,
          registerDate: Date.now(),
        })
        .then((res) => {
          console.log(res);
          event.target.reset();
          alert("Successfully registered! ");
          this.$router.push("/login").catch(()=>{});

        })
        .catch((err) => {
          console.log(err);
          if(err.response.status === 400){
            document.getElementById("userName").value = null;
            alert("User name already exists! ");
          }else{
            alert("Unsuccessful registration! ");
          }
        });
    },
  }
}
</script>