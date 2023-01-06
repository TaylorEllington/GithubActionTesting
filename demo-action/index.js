
try {
  console.log("hello friends!")
} catch (error) {
  core.setFailed(error.message);
}
