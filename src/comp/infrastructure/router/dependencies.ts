import { ExratePen } from "../../application/exrate-pen";
import { YoutubeTitle } from "../../application/youtube-title";
import { Cluster } from "../cluster";
import { AppController } from "../controller";

const cluster = new Cluster(false, 750000);
const youtubeTitle = new YoutubeTitle(cluster);
const exratePen = new ExratePen(cluster)
const appController = new AppController(youtubeTitle, exratePen);

export { appController };