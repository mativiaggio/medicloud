import { account } from "../appwrite.config";

export const login = async (user: LoginParams) => {
  const promise = account.createEmailPasswordSession(user.email, user.password);

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
