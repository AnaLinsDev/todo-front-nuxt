<script>
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        counter_min_3: (value) =>
          (value && value.length >= 3) || "Max 3 characters",
        counter_min_6: (value) =>
          (value && value.length >= 6) || "Max 6 characters",
        counter_min_6_optional: (value) =>
          (value && value.length >= 6) ||
          value.length == 0 ||
          "Max 6 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
};
</script>
