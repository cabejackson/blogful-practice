const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app')
const { makeArticlesArray } = require('./articles.fixtures')


describe.only('Articles Endpoint', function () {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })

        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('blogful_articles').truncate())

    afterEach('cleanup', () => db('blogful_articles').truncate())


    describe(' GET /articles', () => {
        context('Given there are articles in the db', () => {
            const testArticles = makeArticlesArray()


            beforeEach('insert articles', () => {
                return db
                    .into('blogful_articles')
                    .insert(testArticles)
            })
            it('GET /articles responds with 200 and all articles', () => {
                return supertest(app)
                    .get('/articles')
                    .expect(200, testArticles)
            })
        })
    })

    describe('GET /articles/:article_id', () => {
        context('Given there are articles in the db', () => {
            const testArticles = makeArticlesArray()


            beforeEach('insert articles', () => {
                return db
                    .into('blogful_articles')
                    .insert(testArticles)
            })
            it('GET /articles/:article_id responds with 200 and the specified article', () => {
                const articleId = 2
                const expectedArticle = testArticles[articleId - 1]
                return supertest(app)
                    .get(`/articles/${articleId}`)
                    .expect(200, expectedArticle)

            })
        })

    })

    describe.only(`POST /articles`, () => {
        it(`creates an article, responding with 201 and the new article`, function () {
            return supertest(app)
                .post('/articles')
                .send({
                    title: 'Test new article',
                    style: 'Listicle',
                    content: 'Test new article content...'
                })
                .expect(201)
        })
    })









})