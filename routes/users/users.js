const users = [
  {
    id: 1,
    name: 'Surjeet Singh',
  },
  {
    id: 2,
    name: 'James Bond',
  },
  {
    id: 3,
    name: 'Robin Hood',
  },
];

export const getAllUser = (context) => {
  try {
    // just returning an object with data
    context.response.body = {
      message: 'Success',
      data: users,
    };
    context.response.status = 200; // optional... but good to have
  } catch (error) {
    contxt.response.body = { message: 'Failed', error: e };
    contxt.response.status = 500;
  }
};

export const getUserById = async (context) => {
  try {
    let params = await context.params;

    const user = users.find((u) => u.id === parseInt(params.id)) || {};

    context.response.body = {
      message: 'Success',
      data: user,
    };
    context.response.status = 200;
  } catch (e) {
    contxt.response.body = { message: 'Failed', error: e };
    contxt.response.status = 500;
  }
};
