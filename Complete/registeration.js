const registeration = (function () {
  const register = function (username, nickname, password, onSuccess, onError) {
    const data = JSON.stringify({ username, nickname, password });

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })

      .then((json) => {
        if (json.status === "error") {
          if (onError) {
            onError(json.error);
          }
        }
        if (json.status === "success") {
          if (onSuccess) {
            onSuccess();
          }
        }
      });
  };

  return { register };
})();
