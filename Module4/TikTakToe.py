import tkinter as tk;
root = tk.Tk()
root.title("Tik Tak Toe")
root.geometry("330x360")


#these are the labels at the top of the GUI
lbl = tk.Label(root, text="Welcome to Tik Tak Toe", font=("Arial", 20))
lbl.grid(row=0, column=0, columnspan=3)
lbl1 = tk.Label(root, text="Player 1: X      Player 2: O", font=("Arial", 15))
lbl1.grid(row=1, column=0, columnspan=3)
lbl2 = tk.Label(root, text="Click on the square to place your move", font=("Arial", 15))
lbl2.grid(row=2, column=0, columnspan=3)

#setting up options to continue playing or not
def yes_no():
    global yes_btn, no_btn
    yes_btn = tk.Button(root, text="Yes", command=play_again)
    no_btn = tk.Button(root, text="No", command=root.quit)
    yes_btn.grid(row=5, column=0)
    no_btn.grid(row=5, column=2)

#changing a buttons label based on click
def on_click(square_index): 
    if buttonText[square_index] == " " and not game_over: 
        buttonText[square_index] = "X"
        allSquares[square_index].config(text="X")
        check_winner()
        if not game_over:
            generate_random_move()

#if the players move did not end the game, generate a random move
def generate_random_move():
    import random
    empty_squares = [i for i in range(9) if buttonText[i] == " "]
    if empty_squares:
        random_square = random.choice(empty_squares)
        buttonText[random_square] = "O"
        allSquares[random_square].config(text="O")
        check_winner()

#check for a winner based on winning combinations
def check_winner():
    global winninglbl, againlbl, game_over
    winning_combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    #check if any of the winning combinations are met
    for combo in winning_combos:
        if buttonText[combo[0]] == buttonText[combo[1]] == buttonText[combo[2]] != " ":
            winninglbl = tk.Label(root, text="Player " + buttonText[combo[0]] + " wins!", font=("Arial", 20))
            winninglbl.grid(row=3, column=0, columnspan=3)

            againlbl = tk.Label(root, text="Do you want to play again?", font=("Arial", 15))
            againlbl.grid(row=4, column=0, columnspan=3)

            yes_no()
            game_over = True
            return
    #respond to a tie
    if " " not in buttonText:
        winninglbl = tk.Label(root, text="It's a tie!", font=("Arial", 20))
        winninglbl.grid(row=3, column=0, columnspan=3)
        againlbl = tk.Label(root, text="Do you want to play again?", font=("Arial", 15))
        againlbl.grid(row=4, column=0, columnspan=3)
        yes_no()
        game_over = True

#clearing the GUI to play again
def play_again():
    global buttonText, winninglbl, againlbl, yes_btn, no_btn, game_over 

    buttonText = [" "] * 9
    for i in range(9):
        allSquares[i].config(text=" ")

    if winninglbl:
        winninglbl.grid_forget()

    if againlbl:
        againlbl.grid_forget()

    if yes_btn:
        yes_btn.grid_forget()

    if no_btn:
        no_btn.grid_forget()

    game_over = False
    winninglbl = None
    againlbl = None
    yes_btn = None
    no_btn = None



allSquares = []
buttonText = [" "] * 9
game_over = False

#creating the 9 squares for the game
for squares in range(9):
    sq = tk.Button(root, text=" ", width=8, height=5, command=lambda index=squares: on_click(index))
    sq.grid(row=squares//3 + 3, column=squares%3)
    allSquares.append(sq)

root.mainloop()