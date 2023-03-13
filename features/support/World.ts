import { defineParameterType, setWorldConstructor } from "@cucumber/cucumber";
import { ActorParameterType, ActorWorld } from "@cucumber/screenplay";

defineParameterType(ActorParameterType);

export default class World extends ActorWorld {}
setWorldConstructor(World);
