const Header = () => {
    return (
        <div>
            <header>              
                <div
                    className='p-5 text-center bg-image'
                    style={{ backgroundImage: "url('https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=900&t=st=1719098303~exp=1719098903~hmac=5a6af19bfcc72113264d23e928921278b00ef10189549f728ac13f581b7a2b33')", height: '1000px' }}
                >
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-white'>
                                <h1 className='mb-3'>Ready to have some fun?</h1>
                                <h4 className='mb-3'>Check out sport equipment that's available for rent</h4>
                                {/* <MDBBtn tag="a" outline size="lg">
                                    Call to action
                                </MDBBtn> */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
