import { NextFunction, Response, Request } from "express";
import { YoutubeTitle } from "../../application/youtube-title";

export class AppController {

  constructor(
    private youtubeTitle: YoutubeTitle
  ){}

  async getExchangeRate(req: Request, res: Response, next: NextFunction){
    let { url } = req.body;
    const response = await this.youtubeTitle.exec({ url });
    return res.status(200).send(response);
  }

}