
const modules = ["Gallery", "Exhibition", "Artist", "Artwork", "Designer", "Ai", "Nft", "User"] as const;

type ModuleType = {
  [key in (typeof modules)[number]]: any;
};

export const M: ModuleType & { modules: string[] } = {} as any;

modules.forEach((Module) => {

  M[Module] = require(`./${Module.toLocaleLowerCase()}/${Module.toLocaleLowerCase()}`).default;
});

M.modules = modules as unknown as string[];


