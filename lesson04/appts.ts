"use strict";
import * as superAgent from 'superagent'
import * as cheerIo from 'cheerio'
import * as eventProxy from 'eventproxy'
import * as url from 'url'

const cnodeUrl: string = 'https://cnodejs.org/'

superAgent.get(cnodeUrl)
    .end(function (err, sres) {
        // exception 
        if (err) {
            return console.error(err);
        }
    
        let topicUrls: string[] = [];
        let $ = cheerIo.load(sres.text);

        $('#topic_list .topic_title').each(function (idx: number, element: CheerioElement): void{
            let $element = $(element);
            let href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
    
        console.log(topicUrls);
        console.log(topicUrls.length);
        let ep = eventProxy.EventProxy.create()
        // prepare callback function
        ep.after('topic_html', topicUrls.length, function( topics: string[]): void {
            let result = topics.map(function (topicPair: string):
                {title:string, href:string, comment1:string} {

                let topicUrl = topicPair[0];
                let topicHtml = topicPair[1];
                let $ = cheerIo.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                  });
            })
            console.log('final:');
            console.log(result);
        })

        topicUrls.forEach(function (topicUrl: string): void {
            superAgent.get(topicUrl)
              .end(function (err: any, res: superAgent.Response): void{
                console.log('fetch ' + topicUrl + ' successful');
                ep.emit('topic_html', [topicUrl, res.text]);
              });
        });
    })

