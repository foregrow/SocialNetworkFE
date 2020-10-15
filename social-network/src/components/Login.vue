<template>
  <div class="container-fluid">
      <div class="mt-5 col-3">
        <form>
          <h2 class="h2">Login</h2>

          <div class="form-group">
            <input type="text" placeholder="Username" class="form-control" />
          </div>

          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
            />
          </div>
          <button class="btn btn-primary mr-3" type="submit" @click="$router.push('/main')">Log in</button>
          <button class="btn btn-secondary" type="button" @click="$router.push('/register')">No account? Register here</button>

        </form>
      </div>
      
    </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>