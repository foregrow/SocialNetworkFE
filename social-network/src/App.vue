<template>
  <div id="app">
    <div class="container-fluid">
      <div class="mt-5 col-3">
        <form>
          <h2 class="h2">Login</h2>

          <div class="form-group">
            <input type="text" placeholder="Username" class="form-control" />
          </div>

          <div class="form-group">
            <input type="password" placeholder="Lozinka" class="form-control" />
          </div>
          <button class="btn btn-primary" type="submit">Log in</button>
        </form>
      </div>
      <div class="mt-5 col-3">
        <h2>Register</h2>
        <button class="btn btn-primary" type="submit">Submit registration</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
