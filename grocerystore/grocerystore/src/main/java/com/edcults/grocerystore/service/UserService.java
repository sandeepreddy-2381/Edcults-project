package com.edcults.grocerystore.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.models.PasswordResetToken;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.PasswordResetTokenRepository;
import com.edcults.grocerystore.repository.UsersRepository;


@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    @Autowired
    private MailService mailService;

    public ReqRes register(ReqRes registrationReq){
        ReqRes resp =new ReqRes();
        try {
            Users ourUser= new Users();
            ourUser.setEmail(registrationReq.getEmail());
            ourUser.setFullname(registrationReq.getFullname());
            ourUser.setRole(registrationReq.getRole());
            ourUser.setPassword(passwordEncoder.encode(registrationReq.getPassword()));
            Users ourUserRes=usersRepo.save(ourUser);
            if (ourUserRes.getId()>0){
                resp.setUsers(ourUserRes);
                resp.setMessage("successfully created user");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes login(ReqRes loginReq){
        ReqRes resp =new ReqRes();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
           var user=usersRepo.findByEmail(loginReq.getEmail()).orElseThrow();
           var jwt=jwtUtils.generateToken(user);
           var refreshToken=jwtUtils.generateRefreshToken(new HashMap<>(), user);
           resp.setStatusCode(200);
           resp.setToken(jwt);
           resp.setRefreshToken(refreshToken);
           resp.setExpirationTime("24Hrs");
           resp.setMessage("Successfully Logged in");
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public void forgotPassword(String email) throws Exception{
        Users user = usersRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));

        tokenRepository.save(resetToken);

        String resetLink = "http://localhost:8080/api/reset-password?token=" + token;
        mailService.sendMail(user.getEmail(), "Password Reset Request", resetLink);
    }

    public void resetPassword(String token, String newPassword)throws Exception {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        usersRepo.save(user);

        tokenRepository.delete(resetToken);
    }

    public ReqRes refreshToken(ReqRes refreshTokenReq){
        ReqRes resp =new ReqRes();
        try {
            // String email=jwtUtils.extractUsername(refreshTokenReq.getToken());
            Users user=usersRepo.findByEmail(refreshTokenReq.getEmail()).orElseThrow();
            if(jwtUtils.isTokenValid(refreshTokenReq.getToken(), user)){
                var jwt=jwtUtils.generateToken(user);
                resp.setToken(jwt);
                resp.setRefreshToken(refreshTokenReq.getToken());
                resp.setExpirationTime("24Hrs");
                resp.setMessage("Successfully Refreshed Token");
            }
            resp.setStatusCode(200);
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes getAllUsers(){
        ReqRes resp = new ReqRes();
        try {
            List<Users> result=usersRepo.findAll();
            if(!result.isEmpty()){
                resp.setUsersList(result);
                resp.setStatusCode(200);
                resp.setMessage("Successful");
            }else{
                resp.setStatusCode(404);
                resp.setMessage("users not found");
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("error occured:"+e.getMessage());
        }
        return resp;
    }

    public ReqRes getUserById(Integer id){
        ReqRes resp = new ReqRes();
        try {
            Users userById=usersRepo.findById(id).orElseThrow(()->new RuntimeException("user not found"));
            resp.setUsers(userById);
            resp.setStatusCode(200);
            resp.setMessage("Successful found user");
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("error occured:"+e.getMessage());
        }
        return resp;
    }

    public ReqRes deleteUser(Integer id){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Users> userOptional = usersRepo.findById(id);
            if (userOptional.isPresent()) {
                usersRepo.deleteById(id);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUser(Integer userId, Users updatedUser) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Users> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                Users existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setFullname(updatedUser.getFullname());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                Users savedUser = usersRepo.save(existingUser);
                reqRes.setUsers(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Users> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setUsers(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;
    }
}
