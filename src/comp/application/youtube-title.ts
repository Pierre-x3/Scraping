import { Page } from "puppeteer";
import { Cluster } from "../infrastructure/cluster";
import { Params } from "../domain/youtubeParams";

export class YoutubeTitle {

  constructor(
    private cluster: Cluster
  ){}

  public async exec(params: Params ): Promise<object | void> {
    let result = await this.cluster.execute(this.clusterCallback, params);
    await this.cluster.finish();
    return result;
  }

  private async clusterCallback(page: Page, params: Params): Promise<object | void> {
    await page.goto(params.url);
    
    let title = await page.evaluate(()=>{
      let element = document.querySelector('#above-the-fold h1 yt-formatted-string');
      return element?.innerHTML;
    });

    return { title };
  }

}