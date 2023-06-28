import { Injectable } from '@nestjs/common'
import { SECRET, LDAP_URL } from 'config'
import * as ldap from 'ldapjs'
import * as jwt from 'jsonwebtoken'
import { PrismaService } from 'prisma/prisma.service'

const ldapClient = ldap.createClient({
  url: LDAP_URL,
  tlsOptions: { rejectUnauthorized: false }, // Only use this option for testing
})
@Injectable()
export class ActiveDirectoryService {
  private client: ldap.Client
  constructor(public prisma: PrismaService) {
    this.client = ldapClient
  }

  generateJWT(user) {
    const { password, ...userWithoutPassword } = user
    return jwt.sign(
      {
        ...userWithoutPassword,
      },
      SECRET,
      {
        expiresIn: '30m',
      }
    )
  }

  async login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.bind(
        `cn=${username},ou=admins,ou=system`,
        password,
        async (err) => {
          if (err) {
            this.client.bind(
              `cn=${username},ou=users,ou=system`,
              password,
              async (err) => {
                if (err) {
                  console.log('Authentication failed!')
                  reject({
                    code: 401,
                    message: 'Non autorisé',
                    description:
                      "Les justificatifs d'authentification sont manquants ou invalides.",
                  })
                } else {
                  console.log(err)

                  console.log('Supervisor connected to LDAP server')
                  const prisma = new PrismaService()
                  // check uniqueness of username/emai
                  const usernameNotUnique = await prisma.admin.findFirst({
                    where: { username },
                  })

                  if (!usernameNotUnique) {
                    await prisma.admin.create({
                      data: {
                        username,
                        role: 'supervisor',
                      },
                    })
                  }
                  const token = jwt.sign(
                    {
                      username,
                      role: 'supervisor',
                    },
                    SECRET,
                    {
                      expiresIn: '30m',
                    }
                  )
                  resolve({
                    user: {
                      token,
                      username,
                      role: 'supervisor',
                    },
                  })
                }
              }
            )
          } else {
            console.log('Admin connected to LDAP server')

            const prisma = new PrismaService()
            // check uniqueness of username/emai
            const usernameNotUnique = await prisma.admin.findFirst({
              where: { username },
            })

            if (!usernameNotUnique) {
              await prisma.admin.create({
                data: {
                  username,
                  role: 'admin',
                },
              })
            }
            const token = jwt.sign(
              {
                username,
                role: 'admin',
              },
              SECRET,
              {
                expiresIn: '30m',
              }
            )
            resolve({
              user: {
                token,
                username,
                role: 'admin',
              },
            })
          }
        }
      )
    })
  }
}
