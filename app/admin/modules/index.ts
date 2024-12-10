
const modules = ["Gallery", "Exhibition", "Artist", "Artwork", "Designer", "Nft", "Ai", "User"] as const;

export type ModuleType = {
  [key in (typeof modules)[number]]: any;
};

export const M: ModuleType & { modules: string[] } = {} as any;

modules.forEach((Module) => {

  M[Module] = require(`./${Module.toLocaleLowerCase()}/${Module.toLocaleLowerCase()}`).default;
});

M.modules = modules as unknown as string[];



