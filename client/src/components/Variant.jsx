export const addButton = {
    hidden: {
      scale: 0
    },
    visible: {
      scale: 1
    },
    transition: {
      duration: .5,
      type : "Spring",
       stiffness: 300,
    },
    hover: {
      scale: 1.05,
      y: "-3px",
      transition: {
        type : "Spring", stiffness: 300,
      },
    }
  };

export const cardVariant = {
    hidden: {
      y: "-100vh"
    },
    visible: {
      y: "0"
    },
    transition: {
      duration: 1,
      type : "Spring",
       stiffness: 300,
    },
  }

  export const diariesButton = {
    hidden: {
      scale: 0
    },
    visible: {
      scale: 1
    },
    transition: {
      duration: .5,
      type : "Spring",
       stiffness: 300,
    },
    hover: {
      scale: 1.05,
      y: "-10px",
      transition: {
        type : "Spring", stiffness: 300,
      },
    }
  };

  export const diariesCardVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    },
    transition: {
      duration: 1,
      type : "Spring",
       stiffness: 300,
    },
    hover: {
      scale: 1.01,
      y: "-5px",
      transition: {
        type : "Spring", stiffness: 300,
      },
    }
  }