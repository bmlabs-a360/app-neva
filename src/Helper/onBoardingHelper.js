import ApiNeva from "@/api/ApiNeva";

const readJsonConfig = async (iduser, header) => {
  let usersArray = null;
  try {
    let response = await ApiNeva.get(
      "Onboarding/GetByIdUsuario?idUsuario=" + iduser,
      { headers: header }
    );
    if (response.status != 200) return null;
    let data = await response.data.onboardingJson;
    usersArray = JSON.parse(data);
  } catch (error) {
    usersArray = [];
  }
  return usersArray;
};

const writeJsonConfig = async (iduser, newFile, header) => {
  let body = {
    id: 0,
    idUsuario: iduser,
    onboardingJson: JSON.stringify(newFile),
  };

  let response = await ApiNeva.post("Onboarding/SetByIdUsuario", body, {
    headers: header,
  });
  if (!response.status != 200) return false;
  return true;
};

const onBoardingHelper = {
  setUserSeeMenu: async (iduser, idmenu, header) => {
    let usersArray = await readJsonConfig(iduser, header);
    if (usersArray == null) usersArray = [];
    let isChange = false;

    usersArray.map((x) => {
      if (x.id == iduser) {
        x.menus.map((y) => {
          if (y.id == idmenu) {
            y.isonboarding = true;
            isChange = true;
            return y;
          }
        });
      }
    });

    if (!isChange) {
      usersArray.map((x) => {
        if (x.id == iduser)
          x.menus.push({
            id: idmenu,
            isonboarding: true,
          });
      });
    }
    await writeJsonConfig(iduser, usersArray, header);
  },
  getUserSeeMenu: async (iduser, idmenu, header) => {
    let usersArray = await readJsonConfig(iduser, header);
    if (!usersArray) return false;
    let user = usersArray.filter((x) => x.id == iduser);
    let menu = user[0].menus.filter((x) => x.id == idmenu);
    if (menu.length === 0) return false;
    return menu[0].isonboarding;
  },
  setUserSeeMenuNav: async (iduser, header) => {
    let usersArray = await readJsonConfig(iduser, header);
    if (usersArray == null) usersArray = [];

    let user = usersArray.filter((x) => {
      if (x.id == iduser) {
        x.onboardinginitial = true;
        return x;
      }
    });

    if (user.length === 0) {
      let newUser = {
        id: iduser,
        onboardinginitial: true,
        menus: [],
      };
      usersArray.push(newUser);
    }
    await writeJsonConfig(iduser, usersArray, header);
  },
  getUserSeeMenuNav: async (idUser, header) => {
    let usersArray = await readJsonConfig(idUser, header);
    if (usersArray == null) return false;
    let user = usersArray.filter((x) => x.id == idUser);
    if (user.length === 0) return false;
    return user[0].onboardinginitial;
  },
};

const renderSteps = (element) => {
  let step = {
    attachTo: { element: element.id },
    content: {
      title: element.title,
      description: element.description,
    },
  };
  return step;
};

export { onBoardingHelper, renderSteps };
