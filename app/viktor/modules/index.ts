import { F } from '@/app/framework';
import { Module } from 'module';

const modules = ["gallery", "exhibition", "artist", "artwork", "designer", "ai", "nft", "user"] as const;

type ModuleType = {
  [key in (typeof modules)[number]]: any;
};

export const M: ModuleType & { modules: string[] } = {} as any;

modules.forEach((module) => {

  const Module: string = F.capitalize(module);
  M[Module] = require(`./${module}/${module}`).default;
});

M.modules = modules as unknown as string[];
