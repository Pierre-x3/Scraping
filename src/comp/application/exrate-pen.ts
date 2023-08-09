import { Page } from "puppeteer";
import { Params, Rate } from "../domain/youtubeParams";
import { Cluster } from "../infrastructure/cluster";

export class ExratePen {

  constructor(
    private cluster: Cluster,
  ){}

  public async exec(params: Params): Promise<object | void> {
    const response = await this.cluster.execute(this.getExrate, params);
    await this.cluster.finish();
    return response;
  }

  private async getExrate(page: Page, params: Params){

    const timeout = async(ms: number) => {
      return new Promise((resolve, reject)=> {
        setTimeout(()=>{
          return resolve('');
        }, ms)
      });
    };

    await page.goto(params.url, { waitUntil:"networkidle2" });
    await timeout(10000);

    let exchangerate = await page.evaluate(()=> {

      const getTitle = (document: Document) => {
        const parent: any = document.querySelector('button[data-mode="year"]')?.parentElement;
        const buttons: Element[] = Array.from(parent?.querySelectorAll('button'));
        return {
          title: buttons[0].innerHTML,
          anio: buttons[1].innerHTML,
        }
      }

      const formatRate = (rate: string) => {
        return rate.split('>').pop()?.trim();
      }

      const response: Rate[] = [];
      const title = getTitle(document);
      const lines: Element[] = Array.from(document.querySelectorAll('#holder-calendar tbody tr'));

      let cols: Element[] = []; 
      lines.forEach((line: Element)=> {
        cols = cols.concat(Array.from(line.querySelectorAll('td')));
      });

      cols.forEach((col: Element)=>{
        const divs: Element[] = Array.from(col.querySelectorAll('div'));
        const tmpRate: Rate = {};

        if(!divs[0] || !divs[1] || !divs[2]) return;

        if(divs[0]) tmpRate.date = divs[0].innerHTML;
        if(divs[1]) tmpRate.purchase = formatRate(divs[1].innerHTML);
        if(divs[2]) tmpRate.sale = formatRate(divs[2].innerHTML);
        
        response.push(tmpRate);
      });

      return { title, response };
    })

    return exchangerate;
  }

}