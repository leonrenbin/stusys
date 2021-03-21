const Mock = require('mockjs')
const schoolNews = [
    {
        title: '孙志刚在疫情防控工作电视电话会议上强调：外防输入内防扩散，坚决打',
        src: 'http://www.gzmdrw.cn/userfiles/2020/02/image/1580624990870.jpg',
        imgDesc: '1月31日，全省新型冠状病毒感染的肺炎疫情防控工作会议在贵阳召开。图为会议现场。',
        other: '杜朋城 摄',
        source: '文章来源：贵州省人民政府网',
        time: new Date().getTime(),
        paragraph:
`<p>1月31日，我省召开新型冠状病毒感染的肺炎疫情防控工作电视电话会议，
对疫情防控工作进行再动员、再部署。省委书记、省人大常委会主任、
省应对新型冠状病毒感染的肺炎疫情防控工作领导小组组长孙志刚强调，要深入学
习贯彻习近平总书记重要指示精神，坚决扛起疫情防控重大政治责任，
全面落实“外防输入、内防扩散”各项措施，坚决打赢疫情防控阻击战`,
    },
    {
        title: '致全校各级党组织和广大党员、干部的一封信',
        src: '',
        imgDesc: '',
        other: '',
        source: '中共贵州民族大学人文科技学院委员会组织部',
        time: new Date().getTime(),
        paragraph:
`<h1>全校各级党组织和广大党员、干部</h1>, 
<p>当前，正值做好新型冠状病毒感染的肺炎疫情防治工作的关键时期。我省已启动重大突发公共卫生事件I级响应，形势十分严峻。危难时刻显担当。全校各基层党组织和全体党员、干部要深入学习贯彻习近平总书记重要指示精神，坚决贯彻落实中央、省委和学校的各项决策部署，牢记师生利益高于一切，不忘初心、牢记使命，坚守岗位、扎实工作，全力做好疫情防控工作，奋力打赢疫情防控阻击战。</p>, 
<h3>一要提高思想认识，切实坚定必胜信心。</h3>,
<p>省委副书记、省长、领导小组组长谌贻琴主持会议。省领导、领导小组副组长李邑飞、时光辉、卢雍政、赵德明、刘捷、李再勇、何力、王世杰、陶长海、郭瑞民参加会议。</p>,
<h3>二要夯实工作责任，切实筑牢战斗堡垒。</h3>`,
    },
];
const result = Mock.mock({
    "datas|2":[
        {
            'id|+1':1,
            'title|+1': schoolNews.map(item=> item.title),
            'imgUrl|+1':schoolNews.map(item=> item.src),
            imgDesc:schoolNews.map(item=> item.imgDesc),
            imgSource:schoolNews.map(item=> item.source),
            'other|+1': schoolNews.map(item=> item.other),
            'content|+1': schoolNews.map(item=> item.paragraph),
            date:schoolNews.map(item=> item.time),
        }
    ]
}).datas;
const news = require('../models/news')
news.bulkCreate(result);
module.exports = result;