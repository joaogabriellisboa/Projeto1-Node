/* 

        Query Params => meusite.com/users?nome=rodolfo&age=28 //FILTROS
        Route Params =>/users/2     //BUSCAR,DELETAR OU ATUALIZAR ALGO ESPECÍFICO
        Request Body => {"name":"João", "age":20}

    -GET    => Buscar informação no Back-End
    -Post   => Criar informação no back-end
    -PUT / PATCH    => Alternar/atualizar informação no back-end
    -DELETE     =>Deletar informação no back-end

    -Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição 

*/

const teste = require('express')
const uuid  = require('uuid')
const port = 3005
const app = teste()
app.use(teste.json()) //TODA A APLICAÇÃO UTILIZA JSON


const users = []

const checkUserId = (request, response,next) =>{
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index<0){
        return response.status(404).json({menssage:"User Not Found"})
    }

    request.userIndex = index
    request.UserId= id
    next()

}

app.get('/users', (request,response)=>{
    return response.json(users)
})


app.post('/users', (request,response)=>{
    const {name,age,cor} = request.body

    const user = {id: uuid.v4() ,name:name, age:age,cor}

    users.push(user)

    return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request,response)=>{
    const id = request.UserId
    const {name,age,cor} = request.body         //COISAS QUE EU QUERO ATUALIZAR
   
    const index = request.userIndex
                                                 // COMANDO PRA ACHAR O USUÁRIO
     const updatedUser= {id, name, age, cor}
   
    users[index]= updatedUser

    return response.json(updatedUser)
})


app.delete('/users/:id', checkUserId, (request,response)=>{
    const index = request.userIndex

    users.splice(index, 1)  // COMEÇA PELO E DELETA UMA POSIÇÃO ,, (0,4) COMEÇA PELO 0 E DELETA 4 POSIÇÕES
    return response.status(204).json()
})



app.listen(port)