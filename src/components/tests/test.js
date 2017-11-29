    /**
     * Created by Pavel on 29.11.2017.
     */

 //incomplete test, 29.11.2017

    describe("incomplete test",( )=>{

        it('should be called with the email and password in the state as arguments', () => {

            wrapper.find('#email').simulate(
                'change',
                {target:
                {name: 'email', value: 'demo2patient@fitango.com'}
                }
            )
            wrapper.find('#password').simulate(
                'change',
                {target:
                {name: 'password', value: 'Fitango1'}
                }
            )
            wrapper.find('.login-form-button').simulate(
                'submit',
                {preventDefault() {}}
            )
            expect(mockLoginfn.mock.calls[1][0]).toEqual(
                {email: 'demo2patient@fitango.com', password: 'Fitango1'}
            )
        })
    })

