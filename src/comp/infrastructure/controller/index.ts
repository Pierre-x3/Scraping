import { NextFunction, Response, Request } from "express";
import { YoutubeTitle } from "../../application/youtube-title";
import { ExratePen } from "../../application/exrate-pen";

export class AppController {

  constructor(
    private youtubeTitle: YoutubeTitle,
    private exratePen: ExratePen
  ){}

  async getYoutubetitle(req: Request, res: Response, next: NextFunction){
    let { url } = req.body;
    const response = await this.youtubeTitle.exec({ url });
    return res.status(200).send(response);
  }

  async getExchangeRatePen(req: Request, res: Response, next: NextFunction){
    let { url } = req.body;
    
    if(!url) 
      return res.status(400).json({ message: 'The url is required.' });

    const response = await this.exratePen.exec({ url });
    return res.status(200).json({ data: response });
  }

}