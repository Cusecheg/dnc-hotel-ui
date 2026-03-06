const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const MOCKED_SECRET = 'your_secret';

app.db = router.db;

app.use(jsonServer.bodyParser);
app.use(cookieParser());

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = app.db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(404).json({ message: 'Not authorized' });
  }

  const access_token = jwt.sign(
    { email: user.email, sub: user.id, role: user.role },
    MOCKED_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(201).json({ access_token });
});

app.post('/auth/register', (req, res) => {
  const users = app.db.get('users').value();
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const newUser = {
    ...req.body,
    id,
    avatar: null,
    createdAt: new Date().toISOString(),
  };

  app.db.get('users').push(newUser).write();
  return res.status(201).json(newUser);
});

app.post('/auth/forgot-password', (req, res) => {
  res.status(201).json({ message: 'A validation code has been sent to you email' });
})

app.patch('/auth/reset-password', (req, res) => {
  console.log('Cheguei,', req.body);
  res.status(201).json({ access_token: "asdasdadasdasdasdasdasdasdasdasda"});
})

app.post('/users/avatar', (req, res) => {

  const data = {
    id: 1,
    email: 'juanuseche47@gmail.com',
    name: 'Juan Useche',
    avatar: 'https://avatars.githubusercontent.com/u/109441933?v=4',
    role: 'ADMIN',
  }

  res.status(201).json(data);

})

app.get('/users/me', (req, res) => {
  const authHeader = req.headers.authorization.split(" ")[1];
  const token = authHeader.split(".")[1]
  const { sub: id, role } = JSON.parse(Buffer.from(token, 'base64').toString());
  const user = app.db.get("users").find({ id }).value();

  res.status(200).json(user)
})

app.get('/hotels', (req, res) => {
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.limit) || 10;

  console.log('Query params', req.query);
  console.log('Page:', req.query.page, 'Per page:', per_page);

  const hotels = app.db.get('hotels').value();

  const total = hotels.length;
  const start = (page - 1) * per_page;
  const end = start + per_page;
  const paginatedHotels = hotels.slice(start, end);

  res.status(200).json({
    "total": total,
    "page": page,
    "per_page": per_page,
    data: paginatedHotels,
  })
})

app.post('/hotels', (req, res) => {
  return res.status(201).json({
	id: 14,
	name: "Skyline Luxury Hotel",
	description: "Hotel de lujo con rooftop bar, gimnasio y habitaciones premium.",
	address: "Av. Santa Fe 456, Buenos Aires, Argentina",
	image: null,
	price: 310.99,
	ownerId: 3,
	createdAt: "2026-02-23T01:36:19.382Z",
	updatedAt: "2026-02-23T01:36:19.382Z"
  })
})


app.patch('/hotels/image/:id', (req, res) => {
  res.status(201).json({
  id: 14,
	name: "Skyline Luxury Hotel",
	description: "Hotel de lujo con rooftop bar, gimnasio y habitaciones premium.",
	address: "Av. Santa Fe 456, Buenos Aires, Argentina",
	image: "/no-hotel.jpg",
	price: 310.99,
	ownerId: 3,
	createdAt: "2026-02-23T01:36:19.382Z",
	updatedAt: "2026-02-23T01:36:19.382Z"

  })
})

app.patch('/hotels/:id', (req, res) => {
  res.status(201).json({
  id: 14,
	name: "Skyline Luxury Hotel",
	description: "Hotel de lujo con rooftop bar, gimnasio y habitaciones premium.",
	address: "Av. Santa Fe 456, Buenos Aires, Argentina",
	image: "/no-hotel.jpg",
	price: 310.99,
	ownerId: 3,
	createdAt: "2026-02-23T01:36:19.382Z",
	updatedAt: "2026-02-23T01:36:19.382Z"

  })
})



app.get('/hotels/owner', (req, res) => {

  const hotels = app.db.get('hotels').value();

  res.status(200).json(hotels)
})

app.post('/reservations', (req, res) => {

  res.status(201).json(	{
		id: 1,
		userId: 1,
		hotelId: 1,
		checkIn: "2026-02-20T14:00:00.000Z",
		checkOut: "2026-02-25T12:00:00.000Z",
		total: 1500,
		status: "PENDING",
		createdAt: "2026-02-16T12:50:00.000Z",
		updatedAt: "2026-02-16T12:50:00.000Z"
	});
})


app.get('/reservations/hotel/:id', (req, res) => {
  const { id } = req.params;
  res.status(201).json(
		 {
      id: 7,
      userId: 5,
      hotelId: id,
      checkIn: "2026-03-08T03:00:00.000Z",
      checkOut: "2026-03-31T03:00:00.000Z",
      total: 6900,
      status: "PENDING",
      createdAt: "2026-02-27T15:31:28.405Z",
      updatedAt: "2026-02-27T15:31:28.405Z",
      user: {
        id: 5,
        name: "Juan Useche",
        email: "juanuseche47@gmail.com",
        role: "USER",
        avatar: null,
        createdAt: "2026-02-13T15:40:04.083Z"
      }
    },
    {
      id: 3,
      userId: 5,
      hotelId: id,
      checkIn: "2026-02-20T03:00:00.000Z",
      checkOut: "2026-02-28T03:00:00.000Z",
      total: 2400,
      status: "REJECTED",
      createdAt: "2026-02-20T04:45:05.076Z",
      updatedAt: "2026-02-20T04:45:05.076Z",
      user: {
        id: 5,
        name: "Juan Useche",
        email: "juanuseche47@gmail.com",
        role: "USER",
        avatar: null,
        createdAt: "2026-02-13T15:40:04.083Z"
      }
    },
    {
      id: 2,
      userId: 5,
      hotelId: id,
      checkIn: "2026-02-18T03:00:00.000Z",
      checkOut: "2026-03-14T03:00:00.000Z",
      total: 7200,
      status: "PENDING",
      createdAt: "2026-02-18T17:43:12.721Z",
      updatedAt: "2026-02-18T17:43:12.721Z",
      user: {
        id: 5,
        name: "Juan Useche",
        email: "juanuseche47@gmail.com",
        role: "USER",
        avatar: null,
        createdAt: "2026-02-13T15:40:04.083Z"
      }
    },
    {
      id: 1,
      userId: 5,
      hotelId: id,
      checkIn: "2026-02-18T03:00:00.000Z",
      checkOut: "2026-02-28T03:00:00.000Z",
      total: 3000,
      status: "APPROVED",
      createdAt: "2026-02-18T17:39:11.694Z",
      updatedAt: "2026-02-18T17:39:11.694Z",
      user: {
        id: 5,
        name: "Juan Useche",
        email: "juanuseche47@gmail.com",
        role: "USER",
        avatar: null,
        createdAt: "2026-02-13T15:40:04.083Z"
      }
    }
  )
})

app.get('/reservations/user', (req, res) => {
  const reservations = app.db.get('reservations').value();

  res.status(200).json(reservations);
})

app.get('/reservations/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({
  id: id,
  userId: 5,
  hotelId: 6,
  checkIn: '2026-02-20T03:00:00.000Z',
  checkOut: '2026-02-28T03:00:00.000Z',
  total: 2400,
  status: 'PENDING',
  createdAt: '2026-02-20T04:45:05.076Z',
  updatedAt: '2026-02-20T04:45:05.076Z',
  hotel: {
    id: 6,
    name: 'Hotel Pousada Carolina',
    description: 'Hotel bonito',
    address: 'Rua Dnc, 123',
    image: '84a8e9a4-380d-46ec-aaab-7b87b16084d0-download.jpg',
    price: 300,
    ownerId: 5,
    createdAt: '2026-02-17T05:05:23.708Z',
    updatedAt: '2026-02-17T05:06:11.234Z',
    owner: {
      id: 5,
      name: 'Mariana Moreira',
      email: 'juanuseche47@gmail.com',
      avatar: 'a1756b14-8a8d-47db-8ad1-520d4196f8f0-mono.jpeg',
      createdAt: '2026-02-13T15:40:04.083Z'
    }
  }
})
})


app.use(router);

app.listen(3000)

